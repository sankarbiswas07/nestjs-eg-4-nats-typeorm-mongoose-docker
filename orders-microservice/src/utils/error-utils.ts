export function extractRpcError(error: any): { message: string; propertyKey?: string } {
   
    console.log(typeof error);
    console.log(error);
    

    if (typeof error === 'string') {
        return { message: error };
    }

    if (typeof error === 'object' && error !== null) {
        return {
            message: error.message || 'An error occurred',
            propertyKey: error.propertyKey || null,
        };
    }

    return { message: 'An unknown error occurred' };
}

