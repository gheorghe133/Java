import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from "@angular/router";
import { Task } from "src/app/models/Task/task";
import { User } from "src/app/models/User/user";
import { CrudService } from "src/app/services/CrudService/crud.service";

@Component({
  selector: "app-user",
  template: `
    <section class="section">
      <div
        class="container is-flex is-justify-content-space-between	is-align-items-baseline"
      >
        <h1 class="title is-3 m-0">
          <b class="has-text-danger">{{ userDetails?.username }}</b>
          profile
        </h1>
        <div class="buttons">
          <button class="button is-small is-warning" routerLink="/">
            Back
          </button>
          <button
            class="button is-small is-success"
            (click)="toggleCreateModal()"
          >
            Create user task
          </button>
        </div>
      </div>
      <div class="container container-custom mt-5">
        <div class="card" *ngFor="let task of userTasksDisplay">
          <div class="card-content">
            <h4 class="title is-4">{{ task.title }}</h4>
            <div class="content mt-3">
              {{ truncateText(task.description, 400) }}
            </div>
          </div>
          <footer class="card-footer">
            <a class="card-footer-item" (click)="selectUserTask(task, true)"
              >Read</a
            >
            <a class="card-footer-item" (click)="selectUserTask(task)">Edit</a>
            <a class="card-footer-item" (click)="deleteUserTask(task.id)">
              Delete
            </a>
          </footer>
        </div>
      </div>

      <!-- read user modal -->
      <div class="modal" #readModal>
        <div class="modal-background" (click)="toggleReadModal()"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title has-text-danger has-text-weight-bold	">
              {{ userTaskDetails?.title }}
            </p>
            <button
              class="delete"
              aria-label="close"
              (click)="toggleReadModal()"
            ></button>
          </header>
          <section class="modal-card-body">
            {{ userTaskDetails?.description }}
          </section>
          <footer class="modal-card-foot">
            <button
              class="button is-warning is-fullwidth"
              (click)="toggleReadModal()"
            >
              close
            </button>
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
            <form [formGroup]="createUserTaskForm">
              <div class="field">
                <label class="label">Title</label>
                <div class="control">
                  <input
                    class="input is-warning"
                    type="text"
                    formControlName="title"
                    placeholder="Task title"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Description</label>
                <div class="control">
                  <textarea
                    class="textarea is-warning"
                    type="text"
                    formControlName="description"
                    placeholder="Task description"
                  ></textarea>
                </div>
              </div>
            </form>
          </section>
          <footer class="modal-card-foot">
            <button
              class="button is-warning"
              (click)="createUserTask()"
              [disabled]="this.createUserTaskForm.invalid"
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
            <p class="modal-card-title">
              Edit <b class="has-text-danger">{{ userTaskDetails?.title }}</b>
            </p>
            <button
              class="delete"
              aria-label="close"
              (click)="toggleEditModal()"
            ></button>
          </header>
          <section class="modal-card-body">
            <form [formGroup]="editUserTaskForm">
              <div class="field">
                <label class="label">Title</label>
                <div class="control">
                  <input
                    class="input is-warning"
                    type="text"
                    formControlName="title"
                    placeholder="Edit title"
                    [ngModel]="userTaskDetails?.title"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Description</label>
                <div class="control">
                  <textarea
                    class="textarea is-warning"
                    type="text"
                    formControlName="description"
                    placeholder="Edit description"
                    [ngModel]="userTaskDetails?.description"
                  >
                  </textarea>
                </div>
              </div>
            </form>
          </section>
          <footer class="modal-card-foot">
            <button
              class="button is-warning"
              (click)="updateUserTask()"
              [disabled]="this.editUserTaskForm.invalid"
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

      .card-content {
        white-space: pre-wrap;
        word-break: break-word;
      }

      .container-custom {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-gap: 1em 1em;
      }
    `,
  ],
})
export class UserComponent implements OnInit {
  @ViewChild("editModal") editModal: ElementRef;
  @ViewChild("createModal") createModal: ElementRef;
  @ViewChild("readModal") readModal: ElementRef;

  id: any;
  name: string;
  userDetails: User;
  userTaskDetails: Task;

  createUserTaskForm: FormGroup;
  editUserTaskForm: FormGroup;
  userTasksDisplay: Task[];

  constructor(
    private crudService: CrudService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createUserTaskForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(30)]],
      description: [null, [Validators.required, Validators.minLength(1)]],
    });

    this.editUserTaskForm = this.formBuilder.group({
      title: [null, [Validators.required, Validators.maxLength(30)]],
      description: [null, [Validators.required, Validators.minLength(1)]],
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
      this.userTasksDisplay = response;
    });
  }

  public createUserTask() {
    this.crudService
      .createUserTask(this.id, this.createUserTaskForm.value)
      .subscribe(() => {
        this.createUserTaskForm.reset();
        this.toggleCreateModal();
        this.getAllUserTasks();
      });
  }

  public updateUserTask() {
    this.crudService
      .updateUserTask(
        this.id,
        this.userTaskDetails.id,
        this.editUserTaskForm.value
      )
      .subscribe(() => {
        this.toggleEditModal();
        this.getAllUserTasks();
      });
  }
  public deleteUserTask(taskId: number) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (isConfirmed) {
      this.crudService.deleteUserTaskByID(this.id, taskId).subscribe(() => {
        this.getAllUserTasks();
      });
    }
  }

  public selectUserTask(task: Task, isRead: boolean = false) {
    if (isRead) {
      this.userTaskDetails = task;
      this.toggleReadModal();
    } else {
      this.toggleEditModal();
      this.userTaskDetails = task;
      this.editUserTaskForm.setValue({
        title: task.title,
        description: task.description,
      });
    }
  }

  public truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

  public toggleReadModal() {
    this.readModal.nativeElement.classList.toggle("is-active");
  }

  public toggleCreateModal() {
    this.createModal.nativeElement.classList.toggle("is-active");
  }

  public toggleEditModal() {
    this.editModal.nativeElement.classList.toggle("is-active");
  }
}
