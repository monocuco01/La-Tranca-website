import React, { useState } from "react";
import "./address.css";
const Address = ({ onUpdateAddress }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("Cra. 33 #50-07");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleAddressChange = (e) => {
    setDeliveryAddress(e.target.value);

    // Actualiza la información automáticamente al componente padre (Payment)
    onUpdateAddress({
      address: e.target.value,
      instructions: deliveryInstructions,
    });
  };

  // Actualiza los datos automáticamente al cambiar las instrucciones
  const handleInstructionsChange = (e) => {
    setDeliveryInstructions(e.target.value);

    // Actualiza la información automáticamente al componente padre (Payment)
    onUpdateAddress({
      address: deliveryAddress,
      instructions: e.target.value,
    });
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
              onChange={handleAddressChange}
            />
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
          onChange={handleInstructionsChange}
        />
      </div>
    </div>
  );
};

export default Address;
