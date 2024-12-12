import './LoadMoreData.css'

const LoadMoreData = ({clickHandler}) => {
    return (
        <div className='loadMoreData' onClick={clickHandler}>More data available - click or tap here to load.</div>
    );
}

export default LoadMoreData;