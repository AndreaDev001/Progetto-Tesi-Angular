import { Component, OnInit,Input, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { CreateTag } from 'src/model/create';
import { TagService } from 'src/model/services/tag.service';


@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.css']
})
export class CreateTagComponent implements OnInit {

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    color: new FormControl('#00ff00',[Validators.required]),
  })
  public tagIcon: IconDefinition = faTag;
  public currentColor: any = "00ff00";
  public isCreating: boolean = false;
  @Input() boardID: any = undefined;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() successEvent: EventEmitter<any> = new EventEmitter();
  @Output() failedEvent: EventEmitter<any> = new EventEmitter();


  constructor(private tagService: TagService) {

  }

  public ngOnInit(): void {
    
  }

  public handleSubmit(event: any): void {
    if(this.name != undefined && this.color != undefined && this.formGroup.valid) {
      let createTag: CreateTag = {name: this.name.value,color: this.color.value,boardID: this.boardID};
      this.submitEvent.emit(createTag);
      this.reset();
      this.isCreating = true;
      this.tagService.createTag(createTag).subscribe((value: any) => {
        this.isCreating = false;
        this.successEvent.emit(value)
      },(err: any) => {
        this.isCreating = false;
        this.failedEvent.emit(err)
      });
    }
  }

  public reset(): void {
    this.formGroup.reset();
  }

  get name(): any {return this.formGroup.get("name")};
  get color(): any {return this.formGroup.get("color")};
}
