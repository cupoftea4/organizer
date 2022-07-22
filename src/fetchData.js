export const fetchData = async (changes = {}) => {
    let data, dataStatus = 'pending';
    try {
        let response = await fetch("http://my.com/", {
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(changes)
        })
        if (response.ok) dataStatus = 'resolved';
        else dataStatus = 'rejected';
        data = await response.json();
    } catch (error) {
        dataStatus = 'error';
    }
    return {data, dataStatus};
}
