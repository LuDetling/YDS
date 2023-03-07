export default function Profil() {

  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user);

  return <div>Bonjour {user.lastName}</div>;
}
