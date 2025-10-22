import style from "./Admin.module.css";
function Admin() {
  return (
    <>
      <div className={style.widget}>N° de visitas</div>
      <div className={style.widget}>Dispositivos mais utilizados</div>
    </>
  );
}

export default Admin;
