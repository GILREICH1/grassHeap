import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { plantsContext } from '../../App/App';
import './PlantDetails.css';
import { Plant } from '../../../common/types';
import { userContxt } from '../../Authentication/ExternalAPI';

function PlantDetails(): JSX.Element {
  const { name } = useParams<{ name: string }>();
  const { plants } = useContext(plantsContext);
  const { user } = useContext(userContxt);
  const [plantDetails, setPlantDetails] = useState<Plant>(plants[0]);

  console.log(user);
  useEffect(() => {
    const plant: Plant | undefined = plants.find(plant => plant.slug === name);
    if (plant) setPlantDetails(plant);
  }, [name]);

  const commonNames = plantDetails.details?.attributes?.common_names
    ? plantDetails.details.attributes.common_names.map((name, i) => (
        <span key={i} className="PlantDetails__commonNames">
          {name}
        </span>
      ))
    : null;

  return (
    <div className="PlantDetails">
      <div className="PlantDetails__text">
        <h1>
          {plantDetails.name}
          <img
            className="PlantDetails__icon"
            src={`https://www.growstuff.org/crops/${plantDetails.slug}.svg`}
          />
        </h1>
        <p>
          <strong>Alternative Names:</strong>
          {commonNames}
        </p>
        <p>{plantDetails.details?.attributes.description}</p>
        <h3>Sun Requirements</h3>
        <p>{plantDetails.details?.attributes.sun_requirements}</p>
      </div>
      <div className="PlantDetails__images">
        <img
          className="PlantDetails__img PlantDetails__main"
          src={plantDetails.details?.attributes.main_image_path}></img>
        <img
          className="PlantDetails__img PlantDetails__overlay"
          src="https://media.tenor.com/images/946c604540b0416070c5431f1ba9de6f/tenor.gif"></img>
      </div>
    </div>
  );
}

export default PlantDetails;
