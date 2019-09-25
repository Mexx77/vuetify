import {rideService} from "../_services/ride.service";

const state = {
    driver: '',
    destination: '',
    startTime: '12:00',
    endTime: '',
    bigCarNeeded: false,
    showAddEventForm: false,
    focus: '',
    selectedOpen: false,
    selectedEvent: {},
    selectedElement: null,
    rides: []
};

const actions = {
    delete({ commit }, id) {
        rideService.delete(id)
          .then(
            () => commit('deleteSuccess', id),
          );
    },
    addRide({ commit, dispatch }) {
        const ride = {
            driver: state.driver,
            destination: state.destination,
            start: `${state.focus}T${state.startTime}:00`,
            end: `${state.focus}T${state.endTime}:00`,
            bigCarNeeded: state.bigCarNeeded
        }
        rideService.add(ride).then(
            data => {
                commit('setShowAddEventForm', false)
                const newRides = state.rides.concat([data])
                commit('setRides', newRides)
                dispatch('alert/success', {
                    message: 'Danke, deine Reservierungsanfrage wurde entgegengenommen',
                    visible: true
                }, {root: true});
            },
            () => {
                dispatch('alert/error', {
                    message: 'Ups, da ist was fehlgeschlagen - sorry',
                    visible: true
                }, {root: true});
            }
        )
    }
}


const mutations = {
    setDriver: (state, v) => state.driver = v,
    setDestination: (state, v) => state.destination = v,
    setBigCarNeeded: (state, v) => state.bigCarNeeded = v,
    setStartTime: (state, v) => state.startTime = v,
    setEndTime: (state, v) => state.endTime = v,
    setShowAddEventForm: (state, v) => state.showAddEventForm = v,
    setFocus: (state, v) => state.focus = v,
    setSelectedOpen: (state, v) => {
        if(!v) {
            state.selectedEvent = {}
        }
        state.selectedOpen = v
    },
    setSelectedEvent: (state, v) => state.selectedEvent = v,
    setSelectedElement: (state, v) => state.selectedElement = v,
    setRides: (state, v) => state.rides = v,
    deleteSuccess(state, id) {
        state.selectedOpen = false
        state.rides = state.rides.filter(ride => ride.id !== id)
    },
};

export const ride = {
    namespaced: true,
    state,
    actions,
    mutations
};