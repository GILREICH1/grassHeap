import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddButton from './PlantItemAddBtn/AddBtn';
import RemoveBtn from './PlantItemRemoveBtn/RemoveBtn';
import { plantsContext } from '../../App/App';
import { Plant } from '../../../common/types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './PlantItem.css';

interface PlantItemProps {
  plant: Plant;
  inMyPlants: boolean;
  showButtons?: boolean;
}

function PlantItem({
  plant,
  inMyPlants,
  showButtons = true,
}: PlantItemProps): JSX.Element {
  const [plantOwned, setOwned] = useState(false);
  useEffect(() => {
    setOwned(inMyPlants);
  }, [inMyPlants]);

  const { savePlant, removePlant } = useContext(plantsContext);

  return (
    <div
      className="plantItem"
      style={{
        backgroundImage: `url("${plant.details.attributes.main_image_path}")`,
      }}>
      <div className="PlantItem__text">
        <Link className="PlantItem__a" to={`/plants/${plant.slug}`}>
          {plant.name}
          <LazyLoadImage
            src={`https://www.growstuff.org/crops/${plant.slug}.svg`}
          />
        </Link>
        <p className="PlantItem__p">
          {plant.scientific_name || 'not available'}
        </p>
      </div>
      <div className="PlantItem__btnDiv">
        {showButtons ? (
          plantOwned ? (
            <RemoveBtn
              removePlant={() => {
                removePlant(parseInt(plant.id));
              }}
            />
          ) : (
            <AddButton savePlant={() => savePlant(plant)} />
          )
        ) : null}
      </div>
    </div>
  );
}

export default PlantItem;
