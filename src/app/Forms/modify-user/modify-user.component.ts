import { Component, EventEmitter, OnInit,Output} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Validators } from 'ngx-editor';
import { Subscription } from 'rxjs';
import { UserImageService } from 'src/model/services/user-image.service';
import { AuthHandlerService } from 'src/model/auth/auth-handler.service';
import { CollectionModel } from 'src/model/interfaces';
import { UserService } from 'src/model/services/user.service';
import { UpdateUser, UpdateUserImage } from 'src/model/update';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {
  
  public formGroup: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required()]),
    surname: new FormControl('',[Validators.required()]),
    username: new FormControl('',[Validators.required()]),
    gender: new FormControl('',[Validators.required()])
  })
  public userIcon: IconDefinition = faUserCircle;
  public isUpdating: boolean = false;
  public currentFile: any = undefined;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() successEvent: EventEmitter<any> = new EventEmitter();
  @Output() failedEvent: EventEmitter<any> = new EventEmitter();

  public searchingGenders: boolean = false;
  public currentGenders: string[] = [];
  private subscriptions: Subscription[] = [];

  constructor(public authHandler: AuthHandlerService,private userImageService: UserImageService,private userService: UserService) {

  }

  public ngOnInit(): void {
    this.subscriptions.push(this.authHandler.getCurrentUser(false).subscribe((value: any) => {
      this.formGroup.get("name")?.setValue(value.name);
      this.formGroup.get("surname")?.setValue(value.surname);
      this.formGroup.get("username")?.setValue(value.username);
      this.formGroup.get("gender")?.setValue(value.gender);
    }))
    this.updateGenders();
  }

  private updateGenders(): void {
    this.searchingGenders = true;
    this.userService.getGenders().subscribe((value: CollectionModel) => {
      this.currentGenders = value._embedded != undefined && value._embedded.content != undefined ? value._embedded.content : [];
      this.searchingGenders = false;
    },(err: any) => this.searchingGenders = false);
  }

  public handleSubmit(event: any): void {
    if(this.name != undefined && this.surname != undefined && this.username != undefined && this.gender != undefined && this.formGroup.valid) {
      let updateUser: UpdateUser = {name: this.name.value,surname: this.surname.value,username: this.username.value,gender: this.gender.value};
      this.submitEvent.emit(updateUser);
      this.formGroup.reset();
      this.isUpdating = true;
      this.userService.updateUser(updateUser).subscribe((value: any) => {
        this.successEvent.emit(value);
        this.authHandler.refreshUserInfo();
        this.isUpdating = false;
      },(err: any) => {
        this.failedEvent.emit(err);
        this.isUpdating = false;
      })
    }
    if(this.currentFile != undefined) {
      let updateUserImage: UpdateUserImage = {file: this.currentFile};
      this.userImageService.updateUserImage(updateUserImage).subscribe((value: any) => this.successEvent.emit(value),(err: any) => this.failedEvent.emit(err));
    }
  }
  
  public updateCurrentFile(event: any): void {
    this.currentFile = event.target.files[0];
  }

  public reset(): void {
    this.formGroup.reset();
  }

  get name(): any {return this.formGroup.get("name");}
  get surname(): any {return this.formGroup.get("surname");}
  get username(): any {return this.formGroup.get("username");}
  get gender(): any {return this.formGroup.get("gender");}
}
