import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { Task } from "src/app/models/Task/task";
import { CrudService } from "src/app/services/CrudService/crud.service";

@Component({
  selector: "app-user",
  template: `
    <section class="section">
      <div class="container">
        <h1 class="title is-2">
          Crude table for
          <b class="has-text-danger">{{ userDetails?.username }}</b>
        </h1>
        <button
          class="button is-small is-primary"
          (click)="toggleCreateModal()"
        >
          create user task
        </button>
      </div>
      <div class="container container-custom mt-3">
        <div class="card" *ngFor="let task of userTasksDisplay">
          <div class="card-content">
            <div class="media-content">
              <p class="title is-4">{{ task?.title }}</p>
            </div>
            <div class="content">
              {{ task?.description }}
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" (click)="selectUserTask(task)">Edit</a>
            <a class="card-footer-item" (click)="deleteUserTask(task.id)">
              Delete
            </a>
          </footer>
        </div>
      </div>

      <!-- edit user modal -->
      <div class="modal" #createModal>
        <div class="modal-background" (click)="toggleCreateModal()"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Create new task</p>
            <button
              class="delete"
              aria-label="close"
              (click)="toggleCreateModal()"
            ></button>
          </header>
          <section class="modal-card-body">
            <form [formGroup]="createUserForm">
              <div class="field">
                <label class="label">Title</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    formControlName="title"
                    placeholder="Title"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Description</label>
                <div class="control">
                  <textarea
                    class="textarea"
                    type="text"
                    formControlName="description"
                    placeholder="Description"
                  ></textarea>
                </div>
              </div>
            </form>
          </section>
          <footer class="modal-card-foot">
            <button
              class="button is-success"
              (click)="createUserTask()"
              [disabled]="this.createUserForm.invalid"
            >
              Save changes
            </button>
            <button class="button" (click)="toggleCreateModal()">Cancel</button>
          </footer>
        </div>
      </div>

      <!-- edit user modal -->
      <div class="modal" #editModal>
        <div class="modal-background" (click)="toggleEditModal()"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Edit task</p>
            <button
              class="delete"
              aria-label="close"
              (click)="toggleEditModal()"
            ></button>
          </header>
          <section class="modal-card-body">
            <form [formGroup]="editUserForm">
              <div class="field">
                <label class="label">Title</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    formControlName="title"
                    placeholder="Title"
                    [ngModel]="userTaskDetails?.title"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Description</label>
                <div class="control">
                  <textarea
                    class="textarea"
                    type="text"
                    formControlName="description"
                    placeholder="Description"
                    [ngModel]="userTaskDetails?.description"
                  >
                  </textarea>
                </div>
              </div>
            </form>
          </section>
          <footer class="modal-card-foot">
            <button
              class="button is-success"
              (click)="updateUserTask()"
              [disabled]="this.editUserForm.invalid"
            >
              Save changes
            </button>
            <button class="button" (click)="toggleEditModal()">Cancel</button>
          </footer>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .card {
        height: max-content;
      }
      .container-custom {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 1em 1em;
      }
    `,
  ],
})
export class UserComponent implements OnInit {
  @ViewChild("editModal") editModal: ElementRef;
  @ViewChild("createModal") createModal: ElementRef;

  id: any;
  name: string;
  userDetails: any;
  userTaskDetails: any;

  createUserForm: FormGroup;
  editUserForm: FormGroup;
  userTasksDisplay: any = [];

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createUserForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
    });

    this.editUserForm = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.name = params["name"];

      this.getUserDetails();
      this.getAllUserTasks();
    });
  }

  private getUserDetails() {
    this.crudService.getUserByID(this.id).subscribe((result) => {
      this.userDetails = result;
    });
  }

  private getAllUserTasks() {
    this.crudService.getAllUserTasks(this.id).subscribe((response) => {
      console.log(response);
      this.userTasksDisplay = response;
    });
  }

  public createUserTask() {
    this.crudService
      .createUserTask(this.id, this.createUserForm.value)
      .subscribe(
        (response) => {
          console.log("Create successful", response);
          this.toggleCreateModal();
          this.getAllUserTasks();
        },
        (error) => {
          console.error("Create failed", error);
        }
      );
  }

  public updateUserTask() {
    this.crudService
      .updateUserTask(this.id, this.userTaskDetails.id, this.editUserForm.value)
      .subscribe(
        (response) => {
          console.log("Update successful", response);
          this.toggleEditModal();
          this.getAllUserTasks();
        },
        (error) => {
          console.error("Update failed", error);
        }
      );
  }

  public deleteUserTask(taskId: number) {
    this.crudService.deleteUserTaskByID(this.id, taskId).subscribe(
      (response) => {
        console.log("Deleted successful", response);
        this.getAllUserTasks();
      },
      (error) => {
        console.error("Update failed", error);
      }
    );
  }

  public selectUserTask(task: Task) {
    this.toggleEditModal();

    this.userTaskDetails = task;
    this.editUserForm.setValue({
      title: task.title,
      description: task.description,
    });
  }

  public toggleCreateModal() {
    this.createModal.nativeElement.classList.toggle("is-active");
  }

  public toggleEditModal() {
    this.editModal.nativeElement.classList.toggle("is-active");
  }
}
