
import bcrypt from"bcrypt";
import {IsEmail} from "class-validator";
import {OneToMany,ManyToOne,Entity, BaseEntity, Column, PrimaryColumn,CreateDateColumn,UpdateDateColumn,BeforeInsert,BeforeUpdate } from "typeorm";
import Chat from "./Chat";
import Message from "./Message";
import Verification from "./Verification";
import Ride from "./Ride";


const BCRYPT_ROUNDS = 7;

@Entity()
class User extends BaseEntity{
  @PrimaryColumn() id:number;

  @Column({type: "text", unique:true})
  @IsEmail()
  email:string;

  @Column({type:"boolean", default:false})
  verifiedEmail:boolean;

  @Column({type:"text"})
  firstName:string;

  @Column({type:"text"})
  lastName:string;

  @Column({type:"int"})
  ags:number;

  @Column({type:"text"})
  password:string;

  @Column({type:"text"})
  phoneNumber:string;

  @Column({type:"boolean", default:false})
  verifiedPhoneNumber:boolean;

  @Column({type:"text"})
  profilePhoto:string;


  @Column({type:"boolean", default:false})
  isDriving:boolean;

  @Column({type:"boolean", default:false})
  isRiding:boolean;

  @Column({type:"boolean", default:false})
  isTaken:boolean;

  @Column({type:"double precision",default:0})
  lastLng:number;

  @Column({type:"double precision",default:0})
  lastLat:number;

  @Column({type:"double precision",default:0})
  lastOrienation:number;

  @ManyToOne(type => Chat, chat=>chat.participants)
  chat:Chat;

  @OneToMany(type => Message, message => message.user)
  messages:Message[];

  @OneToMany(type=>Verification, verification => verification.user)
  verifications: Verification[];

  @OneToMany(type => Ride, ride =>ride.passenger)
  ridesAsPassenger: Ride[];

  @OneToMany(type => Ride, ride => ride.driver)
  ridesAsDriver: Ride[];


  @CreateDateColumn() createAt: string;
  @UpdateDateColumn() updateAt:string;

  get fullName():string{
    return `${this.firstName} ${this.lastName}`;
  }

  public comparePassword(password:string): Promise<boolean>{
      return bcrypt.compare(password, this.password);
  }

  private hashPassword(password:string): Promise<string>{
    return bcrypt.hash(password, BCRYPT_ROUNDS)
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword() : Promise<void>{
    if(this.password){
      const hashPassword = await this.hashPassword(this.password);
      this.password = hashPassword;
    }else{

    }
  };

}

export default User;
