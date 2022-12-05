
const filterSearch = (match, filter) => {
   
    if(!detectFilter(match.club, filter.club)) {
        return false;
    }

    if(!detectFilter(match.genre, filter.genre)) {
        return false;
    }
    
    if(!detectFilter(match.mode, filter.mode)) {
        return false;
    }
    
    if(!detectPlayers(match.players, filter.players)) {
        return false
    }
    return true;
};

const detectFilter = (list, filterList) => {
    if(filterList.length > 0) {
        for (let index = 0; index < filterList.length; index++) {    
            if(list.toLowerCase() === filterList[index].toLowerCase()) {
                return true;       
            }
        }
        return false;
    }
    return true;
};

const detectPlayers = (list, filterList) => {
    if(filterList.length > 0) {
        for (let index = 0; index < filterList.length; index++) {
            if(list === Number(filterList[index])) {
                return true;
            }
            return false;
        }
    }
    return true;
};

export default filterSearch;