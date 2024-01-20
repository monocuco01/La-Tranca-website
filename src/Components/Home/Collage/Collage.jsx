import React from "react";
import "./collage.css";

const Collage = () => {
  return (
    <div className="containerAllCollage">
      <div className="containerPCollage">
        <div className="photos">
          <div className="primera">
            <img
              src="https://res.cloudinary.com/dziwyqnqk/image/upload/v1705436131/La%20Tranca/-M%C3%A9todo_del_Quemex_Caf%C3%A9_de_la_sierra_cafe_caf%C3%A9_vino_cienaga_cienagamagdalena_frappe_tvs3ar.jpg"
              alt="Latranca"
              srcset=""
            />
          </div>
          <div className="segunda">
            <img
              src="https://res.cloudinary.com/dziwyqnqk/image/upload/v1705436083/La%20Tranca/241670405_589233265764718_5323862559880542002_n_s7ew1e.jpg"
              alt="la tranca"
              srcset=""
            />
          </div>
          <div className="tercera">
            <img
              src="https://res.cloudinary.com/dziwyqnqk/image/upload/v1705436078/La%20Tranca/340023276_915813376235473_3899257439960988271_n_wnn2zu.jpg"
              alt="tranca"
              srcset=""
            />
          </div>

          <div className="cuarta">
            <img
              src="https://res.cloudinary.com/dziwyqnqk/image/upload/v1705436083/La%20Tranca/348443478_1436085040297563_6308369151569442078_n_d3bcoy.jpg"
              alt="tranca"
            />
          </div>
        </div>
        <div className="containerINSTA">
          <h2>
            {" "}
            Estas imágenes cuentan historias de risas, amistades y momentos
            felices que hemos compartido con nuestra querida comunidad. ¡Te
            invitamos a formar parte de ellas! puedes encontrar mas en nuestro
            instagram @latrancac
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Collage;
