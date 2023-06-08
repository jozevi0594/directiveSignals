import { Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent implements OnDestroy, OnInit{
  ngOnInit(): void {
    setInterval(()=>{
      this.counter.update(current=>current +1);
      if(this.counter()==20)
      this.userChangedEffect.destroy();
    },1000)
  }

  public counter =signal(10);

  ngOnDestroy(): void {
    // this.userChangedEffect.destroy();
  }

  increaseBy(value:number){
    this.counter.update(current=>current+value);
  }

  public user =signal<User>({
    id:1,
    email:'jozevi0594@gmail.com',
    first_name:'Jorge',
    last_name:'Zegarra',
    avatar:'https://reqres.in/img/faces/1-image.jpg'
  });

  public fullName=computed(()=>`${this.user().first_name} ${this.user().last_name}`);

  public userChangedEffect=effect(()=>{
    console.log(`${this.user().first_name} - ${this.counter()}`)
  });

  onFieldUpdated(field:keyof User,value:string){
    // this.user.set({
    //   ...this.user(),
    //   [field]:value,
    // });

    this.user.update(current=>{
      return {
        ...current,
        [field]:value
      };
    });

    //  this.user.mutate(current=>{
  //   switch(field){
  //     case 'email':
  //       current.email=value;
  //       break;
  //     case 'first_name':
  //       current.first_name=value;
  //       break;
  //     case 'last_name':
  //       current.last_name=value;
  //       break;
  //     case 'id':
  //       current.id=Number(value);
  //       break;
  //   }
  //  });
  }
}
