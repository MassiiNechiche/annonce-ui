import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  annonces: any;
  form: any;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      titre: [''],
      prix_min: [''],
      prix_max: [''],
      type: [''],
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    const titre = this.form.get('titre')?.value || '';
    const prixMin = this.form.get('prix_min')?.value || '';
    const prixMax = this.form.get('prix_max')?.value || '';
    const type = this.form.get('type')?.value || '';

    try {
      const response = await axios.get(
        `http://localhost:8080/annonces/search?titre=${titre}&prixMin=${prixMin}&prixMax=${prixMax}&type=${type}`
      );
      this.annonces = response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async handleDelete(id: string) {
    await axios
      .delete('http://localhost:8080/annonces/' + id)
      .then((res) => this.getData())
      .catch((err) => console.log(err));
  }

  get fc() {
    return this.form.controls;
  }

  get titre() {
    return this.form.get('titre');
  }

  get prix_min() {
    return this.form.get('prix_min');
  }

  get prix_max() {
    return this.form.get('prix_max');
  }

  get type() {
    return this.form.get('type');
  }

  onReset() {
    this.form.patchValue({
      titre: '',
      prix_min: '',
      prix_max: '',
      type: '',
    });
    this.getData();
  }
}
