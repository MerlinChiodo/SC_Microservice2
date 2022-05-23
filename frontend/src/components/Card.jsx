function Card({title, text, children}) {
    return(
        <div className="card inline-flex m-3 bg-base-200 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{text}</p>
                <div className="card-actions justify-end">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Card