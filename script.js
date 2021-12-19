const send_btn = document.getElementById("send_btn")
const input_msg = document.getElementById("input_message")
const form = document.getElementById("form")

function display(message) {
    const div = document.createElement("div")
    div.textContent = message
    document.getElementById("message_output").append(div)
}