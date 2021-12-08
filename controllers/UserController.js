class UserController{

    constructor(formId, tableId){
        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        this.onSubmit();
    
    }

    onSubmit(){
              
        this.formEl.addEventListener("submit", event=>{
     
             //cancela o comportamento padrão do submit, que é o envio. 
            event.preventDefault();
            
            let values = this.getValues();
            
            this.getPhoto().then(
                (content)=>{
                    values.photo = content;
                    this.addLine(values)
                
            },
                function(e){
                    console.log(e);
                }
            );

                              
         });
     }

     //Metodo para Lê o caminho da foto 
     getPhoto(){
         return new Promise ((resolve, reject)=>    {
            let fileReader = new FileReader();

            let elements = [...this.formEl.elements].filter(item=>{
   
                if(item.name === 'photo'){
                    return item;
                    
                }
   
            });
   
            let file = elements[0].files[0];
           
            fileReader.onload = ()=>{
                           
               resolve(fileReader.result);
   
            };
            FileReader.onerror = (e)=>{
                reject(e);
            }

   
            fileReader.readAsDataURL(file);
         });

     }



    // Criando um metodo que percorre todo o formulario, pegamos dados do campos e cria um JSOn
    getValues(){
        //o let user faz essa variavel existir somente aqui
        let user = {}; 
        console.log(typeof this.formEl.elements);
        [...this.formEl.elements].forEach(function(field, index){

            if(field.name == "gender"){
               
                if(field.checked) {
        
                    user[field.name] = field.value ;
                
                }
                  
            }else{
                
                user[field.name] = field.value ;
                //user[name] = o valor do field
            }
        
        });
        
        return  new User(
            user.name, 
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.passowrd,
            user.photo,
            user.admin
        );
    }

   
    //Cria uma função que adiciona uma linha na tabela
    addLine(dataUser){
           
        this.tableEl.innerHTML = `
        
            <td><img src="${dataUser.photo}" alt="User Image" class="img-circle img-sm"></td>
            <td>${dataUser.name}</td>
            <td>${dataUser.email}</td>
            <td>${dataUser.admin}</td>
            <td>${dataUser.birth}</td>
            <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>      
        
        `    
    }


}