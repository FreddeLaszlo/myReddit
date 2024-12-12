import './Fetching.css';

const Fetching = ({width, height}) => {
    const style = {width:{width}, height:{height}};
    return <div className="fetching" style={{width: width, height: height}}></div>
}

export default Fetching;