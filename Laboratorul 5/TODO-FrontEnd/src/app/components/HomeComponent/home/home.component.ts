import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/models/User/user";
import { CrudService } from "src/app/services/CrudService/crud.service";

@Component({
  selector: "app-home",
  template: `
    <section class="section">
      <div class="container">
        <h1 class="title is-2">
          Crude table with users ({{ userDisplay?.length }})
        </h1>
        <button
          class="button is-small is-primary"
          (click)="toggleCreateModal()"
        >
          create user
        </button>
      </div>
      <div class="container mt-3">
        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
        >
          <thead>
            <tr>
              <th>username</th>
              <th>email</th>
              <th>tasks number</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              *ngFor="let user of userDisplay"
              (click)="navigateToUserPage(user)"
            >
              <td>
                {{ user.username }}
              </td>
              <td>
                {{ user.email }}
              </td>
              <td>
                {{ user.numberOfTasks }}
              </td>
              <td>
                <div class="buttons">
                  <button
                    class="button is-small is-warning"
                    (click)="selectUser(user)"
                  >
                    edit
                  </button>
                  <button
                    class="button is-small is-danger"
                    (click)="deleteUser(user.id)"
                  >
                    delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- edit user modal -->
      <div class="modal" #createModal>
        <div class="modal-background" (click)="toggleCreateModal()"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Create new user</p>
            <button
              class="delete"
              aria-label="close"
              (click)="toggleCreateModal()"
            ></button>
          </header>
          <section class="modal-card-body">
            <form [formGroup]="createUserForm">
              <div class="field">
                <label class="label">Username</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    formControlName="username"
                    placeholder="Username"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    formControlName="email"
                    placeholder="Email"
                  />
                </div>
              </div>
            </form>
          </section>
          <footer class="modal-card-foot">
            <button
              class="button is-success"
              (click)="createUser()"
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
            <p class="modal-card-title">Edit user</p>
            <button
              class="delete"
              aria-label="close"
              (click)="toggleEditModal()"
            ></button>
          </header>
          <section class="modal-card-body">
            <form [formGroup]="editUserForm">
              <div class="field">
                <label class="label">Username</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    formControlName="username"
                    placeholder="Username"
                    [ngModel]="userDetails?.username"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    formControlName="email"
                    placeholder="Email"
                    [ngModel]="userDetails?.email"
                  />
                </div>
              </div>
            </form>
          </section>
          <footer class="modal-card-foot">
            <button
              class="button is-success"
              (click)="updateUser()"
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
  styles: [""],
})
export class HomeComponent implements OnInit {
  @ViewChild("editModal") editModal: ElementRef;
  @ViewChild("createModal") createModal: ElementRef;

  createUserForm: FormGroup;
  editUserForm: FormGroup;
  userDisplay: any = [];
  userDetails: any;

  constructor(
    private crudService: CrudService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createUserForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: ["", Validators.required],
    });

    this.editUserForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: ["", Validators.required],
    });

    this.getAllUsers();
  }

  private getAllUsers() {
    this.crudService.getAllUsers().subscribe((response) => {
      this.userDisplay = response;
    });
  }

  public createUser() {
    this.crudService.createUser(this.createUserForm.value).subscribe(
      (response) => {
        console.log("Create successful", response);
        this.toggleCreateModal();
        this.getAllUsers();
      },
      (error) => {
        console.error("Create failed", error);
      }
    );
  }

  public updateUser() {
    this.crudService
      .updateUser(this.userDetails.id, this.editUserForm.value)
      .subscribe(
        (response) => {
          console.log("Update successful", response);
          this.toggleEditModal();
          this.getAllUsers();
        },
        (error) => {
          console.error("Update failed", error);
        }
      );
  }

  public deleteUser(id: number) {
    this.crudService.deleteUserByID(id).subscribe(
      (response) => {
        console.log("Deleted successful", response);
        this.getAllUsers();
      },
      (error) => {
        console.error("Update failed", error);
      }
    );
  }

  public selectUser(user: User) {
    this.toggleEditModal();

    this.userDetails = user;
    this.editUserForm.setValue({
      username: user.username,
      email: user.email,
    });
  }

  public navigateToUserPage(user: User) {
    this.router.navigate(["user/", user.id, user.username]);
  }

  public toggleCreateModal() {
    this.createModal.nativeElement.classList.toggle("is-active");
  }

  public toggleEditModal() {
    this.editModal.nativeElement.classList.toggle("is-active");
  }
}
