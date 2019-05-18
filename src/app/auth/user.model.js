export class User {
  constructor(email, password, firstName, lastName, congregation, circuito, mobilephone, phone, datebirth, responsable, conjuge, sex, privilege, eldermail, config, released, userId, lastday, role, agenda, escala, telegram) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.congregation = congregation;
    this.circuito = circuito;
    this.mobilephone = mobilephone;
    this.phone = phone;
    this.datebirth = datebirth;
    this.responsable = responsable;
    this.conjuge = conjuge;
    this.sex = sex;
    this.privilege = privilege;
    this.eldermail = eldermail;
    this.config = config;
    this.released = released;
    this.userId = userId;
    this.lastday = lastday;
    this.role = role;
    this.agenda = agenda;
    this.escala = escala;
    this.telegram = telegram;
    this.sim = false;
    this.nao = false;
  }
}
