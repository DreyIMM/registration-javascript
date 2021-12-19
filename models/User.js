class User{
    
    constructor(name,gender, birth, country, email, password, photo,admin){
        this._name = name;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._email = email;
        this._password = password;
        this._photo = photo;
        this._admin = admin
        this._register = new Date();
    }
    
    get register(){
        return this._register
    }

    set register(r){
        this._register = r; 
    }

    get name(){
        return this._name;
    }

    set name(name){
        this._name =  name;
    }

    get gender(){
        return this._gender;
    }

    set gender(gender){
        this._gender =  gender;
    }

    get birth(){
        return this._birth;
    }

    set birth(birth){
        this._birth =  birth;
    }

    get country(){
        return this._country;
    }

    set country(country){
        this._country =  country;
    }

    get email(){
        return this._email;
    }

    set email(email){
        this._email =  email;
    }

    get password(){
        return this._password;
    }

    set password(password){
        this._password =  password;
    }

    get photo(){
        return this._photo;
    }

    set photo(photo){
        this._photo =  photo;
    }

    get admi(){
        return this._admin;
    }

    set admi(admi){
        this._admin =  admi;
    }


}