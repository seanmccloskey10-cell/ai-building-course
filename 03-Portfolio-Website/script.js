function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    alert(`Thanks ${name}! I'll get back to you at ${email} soon.`);
    event.target.reset();
}
