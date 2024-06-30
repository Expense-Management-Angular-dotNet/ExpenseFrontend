import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() closeSearch = new EventEmitter<void>();
  searchForm: FormGroup;
  searchResults: any[] = [];
  isLoading = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.searchForm = this.fb.group({
      query: ['', [Validators.required]]
    });
  }

  onSearch() {
    if (this.searchForm.valid) {
      const query = this.searchForm.value.query;
      this.isLoading = true;
      this.userService.searchUsers(query).subscribe(results => {
        this.searchResults = results;
        this.isLoading = false;
      });
    }
  }

  close() {
    this.closeSearch.emit();
  }
}
