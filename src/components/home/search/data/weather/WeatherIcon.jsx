import { useEffect, useState } from 'react';

export default function WeatherIcon({icon}) {

    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await import(`../../../../../assets/images/weather/${icon + '.png'}`)
                setImage(response.default)
            } catch (err) {
               return;
            } 
        }
        fetchImage()
    }, [icon])

  return <img width={70} src={image} />
}
