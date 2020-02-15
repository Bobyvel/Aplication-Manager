export const formErrors = data => {
  const { name, email, age, phone, level, startDate, skills, info } = data;
  if (name.lenght < 3 || name.lenght > 40) {
    return "The name must be between 3 and 40 characters";
  }
  const regex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
  if (!regex.test(email.toLowerCase())) {
    return "Please write valid e-mail";
  }
  if(age <= 0 || age > 90){
    return "Write valid age"
  }
  if(phone.lenght < 5 || phone.lenght > 15){
    return "Write valid phone"
  }
  if(level === "default"){
    return "English level is requered"
  }
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  const startDateY = startDate.split('-')[0]
  const startDateM = startDate.split('-')[1]
  const startDateD = startDate.split('-')[2]
  if(startDateY < yyyy){
    return "The year is in the past "
  }
  if(startDateY >= yyyy && startDateM < mm){
    return "The month is in the past "
  }
  if(startDateY >= yyyy && startDateM >= mm && startDateD < dd){
    return "The day is in the past "
  }
  if(skills.lenght > 100){
    return "Skills are too long"
  }
  if(info.lenght > 100){
    return "Skills are too long"
  }
  return "";
};
