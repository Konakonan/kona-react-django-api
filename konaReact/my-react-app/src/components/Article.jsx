const Article=(props) =>{
    return(
        <>
        <h2>{props.title}</h2>
        <p>{<props.conten}</p>
        </>
    )
};

export default Article;