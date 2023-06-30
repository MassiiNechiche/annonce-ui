import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.css'],
})
export class AddAnnonceComponent {
  data: any;
  form: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  async onSubmit() {
    await axios
      .post('http://localhost:8080/annonces/', { ...this.form.value })
      .then((res) => this.router.navigate(['/']))
      .catch((err) => console.log(err));
  }

  get fc() {
    return this.form.controls;
  }

  get titre() {
    return this.form.get('titre');
  }

  get description() {
    return this.form.get('description');
  }

  get prix() {
    return this.form.get('prix');
  }

  get type() {
    return this.form.get('type');
  }
}
