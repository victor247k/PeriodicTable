import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from "./Modal.jsx";
import "./Element.css";
import './ElementModal.css'
import elements from '../elementsV2.js';

function Element({ symbol, aditionalClass }) {
  const [modal, setModal] = useState(false); 
  const elementData = elements.find(item => item.symbol === symbol); 

  const format_key = (key) => {
    let formatted = key.replace(/_/g, " "); 
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1); 
    return formatted;
  }

  const formatLink = () => {
    return String(elementData.atomic_number).padStart(3, '0') + '_' + elementData.name.toLowerCase()
  }

  return (
    <>
      {elementData && (
        <div onClick={() => setModal(true) } className={`element ${aditionalClass}`}>
          <h2 className='element-symbol'>{symbol}</h2>
          <>
            <span className='element-number'>{elementData.atomic_number}</span>
            <span className='element-weight'>{elementData.atomic_weight}</span>
            <span className='element-name'>{elementData.name}</span>
          </>
        </div>
      )}
      {modal && (
        <Modal className='modal' openModal={modal} closeModal={() => setModal(false)}>
          {elementData ? (
            <div className='modal-div'>
              <section>
                <h2 className={`modal-name ${aditionalClass}`}>{elementData.name}</h2>
                <div className='modal-basic-data'>
                  {elementData.atomic_number && <p>Number: <span className={aditionalClass}>{elementData.atomic_number}</span></p>}
                  {elementData.atomic_weight && <p>Mass: <span className={aditionalClass}>{elementData.atomic_weight}</span></p>}
                  {elementData.electron_configuration && <p>Electron configuration: <span className={aditionalClass}>{elementData.electron_configuration}</span></p>}
                  {elementData.block && <p>Block: <span className={aditionalClass}>{elementData.block}</span></p>}
                  {elementData.category && <p>Category: <span className={aditionalClass}>{elementData.category}</span></p>}
                  {elementData.melting_point && <p>Melting point: <span className={aditionalClass}>{elementData.melting_point}</span></p>}
                  {elementData.boiling_point && <p>Boiling point: <span className={aditionalClass}>{elementData.boiling_point}</span></p>}
                  {elementData.density && <p>Density: <span className={aditionalClass}>{elementData.density}</span></p>}
                </div>
              </section>
              <section className='model-extra'>
                <video autoPlay={true} loop>
                  <source src={`https://www.gstatic.com/culturalinstitute/searchar/assets/element_${formatLink()}/desktop_dark.mp4`} />
                </video>
                <div>
                  {elementData.discovery && <p>Discovery: <span className={aditionalClass}>{elementData.discovery}</span></p>}
                  {elementData.discovered_in && <p>Discovered in: <span className={aditionalClass}>{elementData.discovered_in}</span></p>}
                  {elementData.appearance && <p>Appearance: <span className={aditionalClass}>{elementData.appearance}</span></p>}
                  {elementData.abundance && <p>Abundance: <span className={aditionalClass}>{elementData.abundance}</span></p>}
                </div>
              </section>
              <section className='modal-list'>
                <h3>Uses <i>⚙️ </i></h3>
                <ol>
                  {elementData.uses && elementData.uses.map((v, i) => (
                    <li className={aditionalClass} key={i}>{v}</li>
                  ))}
                </ol>
              </section>
              <section className='modal-list'>
                <h3>Notable properties <i>🔍</i></h3>
                <ul>
                  {elementData.notable_properties && Object.entries(elementData.notable_properties).map(([key, value], i) => (
                    <li key={i}>{format_key(key)}: <span className={aditionalClass}>{value}</span></li>
                  ))}
                </ul>
              </section>
              <section className='modal-list'>
                <h3>Biology facts <i>🧬</i></h3>
                <ul>
                  {elementData.biology_facts && Object.entries(elementData.biology_facts).map(([key, value], i) => (
                    <li key={i}>{format_key(key)}: <span className={aditionalClass}>{value}</span></li>
                  ))}
                </ul>
              </section>
            </div>
          ) : (
              <p>Loading...</p>
            )}
        </Modal>
      )}
    </>
  );
}

Element.propTypes = {
  symbol: PropTypes.string.isRequired,
  aditionalClass: PropTypes.string,
};

export default Element;
