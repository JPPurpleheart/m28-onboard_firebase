[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/fE1utJVw)


Como desplegar la aplicación en local:

  Frontend:
  
    1. cd forntend-jwt/
    2. composer install
    3. kill -9 $(lsof -t -i:4200)
    4. ng serve
  
  Backend:
    
    1. cd backend-jwt/
    2. composer install
    3. kill -9 $(lsof -t -i:8000)
    4. php artisan serve


Usuarios de Prueba de la aplicación

  Profesores de Prueba:
  
    Profesor 1:
    
      username: moisespeinado
      password: iebcadiz23
    
    Profesor 2:
      
      username: miguelangelprado
      password: HorebSanPablo23
  
  Alumnos de Prueba:
    
    Alumno 1:
      
      username: alumnotestaccount
      password: testAccount123
      
      
  Secciones ya implementadas:
    
    
    Login-Signup
    
    CRUD:
    
      Itinerarios
      Cursos
      Clases
