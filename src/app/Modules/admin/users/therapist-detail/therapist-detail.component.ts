import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { UserService } from '../service/user.service';
import { FormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image'; 
import { CardModule } from 'primeng/card'; 
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-therapist-detail',
  imports: [
    DropdownModule,
    ButtonModule,
    FormsModule,
    ImageModule,
    CardModule,
   ToolbarModule,
   DialogModule
  ],
  templateUrl: './therapist-detail.component.html',
  styleUrl: './therapist-detail.component.scss'
})
export class TherapistDetailComponent {
  user: any;
  documentImage: string = 'path-to-your-document-image'; 
  selectedStatus: any;
  statusOptions: any[] = [
    { label: 'Accept', value: 'accept' },
    { label: 'Reject', value: 'reject' }
  ];
  details = [
    {
      header: 'User Details 1',
      imageUrl: '/assets/images/zenmind-logo.png',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      description: 'This is the first user detail section.',
      selectedStatus: null,
    },
    {
      header: 'User Details 2',
      imageUrl: '/assets/images/zenmind-logo.png',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'User',
      description: 'This is the second user detail section.',
      selectedStatus: null,
    },
    {
      header: 'User Details 1',
      imageUrl: '/assets/images/zenmind-logo.png',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      description: 'This is the first user detail section.',
      selectedStatus: null,
    },
    {
      header: 'User Details 2',
      imageUrl: '/assets/images/zenmind-logo.png',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'User',
      description: 'This is the second user detail section.',
      selectedStatus: null,
    },
  ];
  showDialog: boolean = false;
  rejectionReason: string = '';
  selectedDetail: any = null;
  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    // this.user = this.userService.getUserById(userId); 
   
  }
  getSeverity(status: string): string {
    switch (status) {
      case 'accept':
        return 'success';
      case 'reject':
        return 'danger';
      default:
        return 'info';
    }
  }
  downloadDocument(imageUrl: string, fileName: string) {
    fetch(imageUrl)
      .then(response => response.blob()) 
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName || 'downloaded-image'; 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Error downloading image:', error));
  }  
  onStatusChange(detail: any) {
    debugger
    if (detail.selectedStatus == 'reject') {
      this.selectedDetail = detail;
      this.showDialog = true;
    }
  }
  submitReason() {
    this.rejectionReason=''
    this.showDialog = false;
  }
  cancelReason() {
    if (this.selectedDetail) {
      this.selectedDetail.selectedStatus = ''; 
    }
    this.rejectionReason=''
    this.showDialog = false;
  }
}
