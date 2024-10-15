import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Asegúrate de que la ruta sea correcta
import { User } from '../../models/user.model'; // Asegúrate de que la ruta sea correcta
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
  standalone: true,  // Asegúrate de que el componente sea independiente
  imports: [FormsModule, CommonModule]  // Importa FormsModule y CommonModule aquí
})
export class SearchUserComponent implements OnInit {
  searchTerm: string = ''; // Almacena el término de búsqueda
  usuarios: User[] = []; // Almacena la lista de usuarios
  filteredUsuarios: User[] = []; // Almacena la lista filtrada

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Cargar usuarios desde el UserService al iniciar el componente
    this.userService.getUsers().subscribe(data => {
      this.usuarios = data; // Almacenar todos los usuarios
      this.filteredUsuarios = data; // Inicialmente, mostrar todos los usuarios
    });
  }

  // Método para buscar usuarios
  buscarUsuarios(): void {
    if (this.searchTerm.trim() === '') {
      // Si el término de búsqueda está vacío, mostrar todos los usuarios
      this.filteredUsuarios = this.usuarios;
    } else {
      // Filtrar la lista de usuarios según el término de búsqueda
      this.filteredUsuarios = this.usuarios.filter(user =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.mail.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}