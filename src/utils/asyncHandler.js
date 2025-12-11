const asyncHandler = (requestHandler) => {
    
    return (req, res, next) => {
        // Convert the handler into a Promise and execute it
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err));
    };
};

export { asyncHandler };
