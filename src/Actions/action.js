export const CreateSocket = (socket) => ({
	type: "create_socket",
	payload: {
        socket: socket
    }
})

export const RemoveSocket = () => ({
	type: "remove_socket"
})

export const CreateGame = (game) => ({
	type: "create_game",
	payload: {
        game: game
    }
})

export const RemoveGame = () => ({
	type: "remove_game"
})

export const AddBoardColumn = (column) => ({
	type: "add_board_column",
	payload: {
		column: column
	}
})