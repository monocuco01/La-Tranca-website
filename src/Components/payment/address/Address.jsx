// En el componente Address
import React, { useState } from "react";
import "./address.css";

const Address = ({ onUpdateAddress }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("Cra. 33 #50-07");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);

    // Obtén la información actualizada de la dirección
    const addressData = {
      address: deliveryAddress,
    };

    // Llama a la función onUpdateAddress para enviar la información al componente padre (Payment)
    onUpdateAddress(addressData);
  };

  return (
    <div className="containerDireccion">
      <div className="containerDIVdireccion">
        <h3>Dirección de entrega</h3>
        {isEditMode ? (
          <>
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
            <p onClick={handleSaveClick}>Guardar</p>
          </>
        ) : (
          <p onClick={handleEditClick}>Cambiar</p>
        )}
      </div>
      <div className="containerDireccionReal">
        <p>{deliveryAddress}</p>
      </div>
      <div className="divi">
        <p>Instrucciones de entrega (opcional)</p>
        <input
          type="text"
          placeholder="Detalles de entrega"
          value={deliveryInstructions}
          onChange={(e) => setDeliveryInstructions(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Address;
