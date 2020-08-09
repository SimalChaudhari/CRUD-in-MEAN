import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/users.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  userId;
  addMode = true;
  user : any = [];

  constructor(public fb: FormBuilder, private route: ActivatedRoute, private toastr: ToastrService,
    private router: Router, public useService: UserService) {
      this.route.paramMap.subscribe(params => {
        this.userId = params.get('Id');
        if(this.userId){
          this.addMode = false;
          this.getUserById(this.userId);
        }
     });
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],    
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  //on registration form submit
  async onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    if(this.addMode){
      this.useService.create(this.userForm.value).subscribe(response =>{
        this.toastr.success('User has been created successfully', 'Success!'); 
        this.router.navigateByUrl('/');
      },(error) =>{
        console.log(error)
        this.toastr.error('Please try again!', 'Error!');
      });
    }else{
      this.useService.update(this.userId, this.userForm.value).subscribe(response =>{
        this.toastr.success('User has been updated successfully', 'Success!');
        this.router.navigateByUrl('/');
      },(error) =>{
        this.toastr.error('Please try again!', 'Error!');
      });
    }
  }


  getUserById(Id){
    this.useService.getById(Id).subscribe(response => {
      this.user = response['user'];
    })
  }
}
