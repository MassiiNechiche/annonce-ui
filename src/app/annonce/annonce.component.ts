import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css'],
})
export class AnnonceComponent implements OnInit {
  id: string | null | undefined;
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

  ngOnInit() {
    this.route.paramMap.subscribe((value) => {
      let id = value.get('id');
      this.id = id;
      id && this.getAnnonce(id);
    });
  }

  async getAnnonce(id: string) {
    try {
      const response = await axios.get('http://localhost:8080/annonces/' + id);
      this.data = response.data;
      this.setFormValues();
    } catch (error) {
      console.log(error);
    }
  }

  setFormValues() {
    if (this.data) {
      this.form.patchValue({
        titre: this.data.titre,
        description: this.data.description,
        prix: this.data.prix,
        type: this.data.type,
      });
    }
  }

  async onSubmit() {
    await axios
      .put('http://localhost:8080/annonces/' + this.id, { ...this.form.value })
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
