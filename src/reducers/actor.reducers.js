import { actorConstants } from "../actions/constants";

const initState = {
    actorList: [],
    loading: false,
    error: null
}

const buildNewActor = (parentId,actors, actor) => {
    let myActors = []

    for(let act of actors) {
        const newActor = {
            _id: actor._id,
            name: actor.name,
            slug: actor.slug,
        };
        myActors.push({
            ...act,
        });
    }
    return myActors
}

export default (state = initState, action) => {

    console.log(action);

    switch (action.type) {
        case actorConstants.GET_ALL_ACTORS_SUCCESS:
            state = {
                ...state,
                actorList: action.payload.actorList
            }
            break;
        case actorConstants.ADD_NEW_ACTORS_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case actorConstants.ADD_NEW_ACTORS_SUCCESS:
            const actor = action.payload.actor
            const updatedActor = buildNewActor(actor._id,state.actorList, actor)
            console.log('updated actor', updatedActor)
            state = {
                ...state,
                actorList: updatedActor,
                loading: false
            }  
            break;
        case actorConstants.ADD_NEW_ACTORS_FAILURE:
            state = {
                initState
            }
            break;
    }
    return state;
}