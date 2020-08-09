import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/users.services';
import { User } from '../../models/users';
import Swal from 'sweetalert2'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users: User[] = [];
  allusers: User[] = [];
  role = 'All';
  searchText;

  constructor(private userServices : UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getAll();
  }

  //get all users
  getAll(){
    this.userServices.getAll().subscribe((data: User[])=>{
      this.users = data['users'];
      this.allusers = data['users'];
    })
  }

  // Delete used based on Id
  onDelete(user){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.userServices.delete(user._id).subscribe(response=>{
          this.toastr.success('User has been deleted successfully', 'Success!'); 
          this.getAll();
        });
      }
    }).catch(error =>{
      this.toastr.error('Please try again!', 'Error!');
    })
  }

  // Filter data based role from existing data
  onFilter(event){
    if(event.target.value == 'Artist'){
      this.users = this.allusers.filter(user => user.role == 'Artist');
    }else if(event.target.value == 'Designer'){
      this.users = this.allusers.filter(user => user.role == 'Designer');
    }else if(event.target.value == 'Art Manager'){
      this.users = this.allusers.filter(user => user.role == 'Art Manager');
    }else if(event.target.value == 'All'){
      this.users = this.allusers;
    }else{
      this.users = [];
    }
  }
}
