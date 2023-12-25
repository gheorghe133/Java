import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "src/app/models/User/user";
import { CrudService } from "src/app/services/CrudService/crud.service";

@Component({
  selector: "app-home",
  template: `
    <section class="section">
      <div
        class="container is-flex is-justify-content-space-between	is-align-items-center"
      >
        <h1 class="title is-3 m-0">
          Users dashboard ({{ userDisplay?.length }})
        </h1>
        <button
          class="button is-small is-warning"
          (click)="toggleCreateModal()"
        >
          Create user
        </button>
      </div>
      <div class="container mt-5">
        <table class="table is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Email</th>
              <th>Tasks number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              *ngFor="let user of displayedUsers"
              (click)="navigateToUserPage(user)"
            >
              <td>
                {{ user.id }}
              </td>
              <td>
                {{ user.username }}
              </td>
              <td>
                {{ user.email }}
              </td>
              <td>
                {{ user.totalTasks }}
              </td>
              <td>
                <div class="buttons">
                  <button
                    class="button is-small is-warning"
                    (click)="selectUser(user)"
                  >
                    Edit
                  </button>
                  <button
                    class="button is-small is-danger"
                    (click)="deleteUser(user.id)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="container mt-5">
        <nav
          class="pagination is-small"
          role="navigation"
          aria-label="pagination"
        >
          <button
            class="button pagination-previous"
            title="This is the first page"
            [disabled]="pageNumber === 1"
            (click)="changePage(pageNumber - 1)"
          >
            Previous
          </button>
          <button
            class="button pagination-next"
            [disabled]="pageNumber * pageSize >= userDisplay.length"
            (click)="changePage(pageNumber + 1)"
          >
            Next page
          </button>
          <ul class="pagination-list">
            <li *ngFor="let page of pageNumbers">
              <a
                class="pagination-link"
                [class.is-current]="page === pageNumber"
                (click)="changePage(page)"
              >
                {{ page }}
              </a>
            </li>
          </ul>
        </nav>
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
                    class="input is-warning"
                    type="text"
                    formControlName="username"
                    placeholder="Ex. user1"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    class="input is-warning"
                    type="text"
                    formControlName="email"
                    placeholder="Ex. user1@excemple.com"
                  />
                </div>
              </div>
            </form>
          </section>
          <footer class="modal-card-foot">
            <button
              class="button is-warning"
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
            <p class="modal-card-title">
              Edit <b class="has-text-danger"> {{ userDetails?.username }}</b>
            </p>
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
                    class="input is-warning"
                    type="text"
                    formControlName="username"
                    placeholder="Edit username"
                    [ngModel]="userDetails?.username"
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Email</label>
                <div class="control">
                  <input
                    class="input is-warning"
                    type="text"
                    formControlName="email"
                    placeholder="Edit email"
                    [ngModel]="userDetails?.email"
                  />
                </div>
              </div>
            </form>
          </section>
          <footer class="modal-card-foot">
            <button
              class="button is-warning"
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
  styles: [],
})
export class HomeComponent implements OnInit {
  @ViewChild("editModal") editModal: ElementRef;
  @ViewChild("createModal") createModal: ElementRef;

  createUserForm: FormGroup;
  editUserForm: FormGroup;
  userDisplay: User[] | null;
  userDetails: User | null;

  displayedUsers: User[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  pageNumbers: number[] = [];

  constructor(
    private crudService: CrudService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createUserForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(1)]],
      email: [null, [Validators.required, Validators.email]],
    });

    this.editUserForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(1)]],
      email: [null, [Validators.required, Validators.email]],
    });

    this.getAllUsers();
  }

  private getAllUsers() {
    this.crudService.getAllUsers().subscribe((response) => {
      this.userDisplay = response;
      this.updateDisplayedUsers();
    });
  }

  private updateDisplayedUsers() {
    const startIndex = (this.pageNumber - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedUsers = this.userDisplay.slice(startIndex, endIndex);
    this.updatePageNumbers();
  }

  private updatePageNumbers() {
    const pageCount = Math.ceil(this.userDisplay.length / this.pageSize);
    this.pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (
      page >= 1 &&
      page <= Math.ceil(this.userDisplay.length / this.pageSize)
    ) {
      this.pageNumber = page;
      this.updateDisplayedUsers();
    }
  }

  public createUser() {
    this.crudService.createUser(this.createUserForm.value).subscribe(() => {
      this.createUserForm.reset();
      this.toggleCreateModal();
      this.getAllUsers();
    });
  }

  public updateUser() {
    this.crudService
      .updateUser(this.userDetails.id, this.editUserForm.value)
      .subscribe(() => {
        this.toggleEditModal();
        this.getAllUsers();
      });
  }

  public deleteUser(id: number) {
    event.stopPropagation();

    this.crudService.deleteUserByID(id).subscribe(() => {
      this.getAllUsers();
    });
  }

  public selectUser(user: User) {
    event.stopPropagation();

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
