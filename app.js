document.getElementById('btnAbsen').addEventListener('click', function() {
    const btn = this;
    const statusText = document.getElementById('status');
    console.log("1")
    btn.disabled = true;
    statusText.innerText = "Mengambil lokasi...";

    // 1. Cek apakah Browser mendukung Geolocation
    if (!navigator.geolocation) {
        statusText.innerText = "Browser Anda tidak mendukung lokasi.";
        btn.disabled = false;
        return;
    }

    // 2. Ambil koordinat
    const options = {
        enableHighAccuracy: true, // WAJIB untuk akurasi GPS tinggi
        timeout: 10000,           // Batas waktu tunggu (10 detik)
        maximumAge: 0             // Jangan ambil cache lokasi lama
    };

    navigator.geolocation.getCurrentPosition(
        // Sukses
        (position) => {
            sendDataToBackend(position.coords.latitude, position.coords.longitude, statusText, btn);
        },
        // Gagal
        (error) => {
            statusText.innerText = "Gagal mengambil lokasi: " + error.message;
            btn.disabled = false;
        },
        options
    );
});

function sendDataToBackend(lat, lng, statusText, btn) {
    statusText.innerText = "Mengirim data...";
    btn.disabled = false;
    statusText.innerText = lat + " " + lng;

    // Ganti URL dengan URL Backend Golang (misal di Render/Koyeb)
    // fetch('https://nama-backend-anda.com/api/attendance', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         user_id: 1, // Anda bisa mengambil ini dari sistem login nanti
    //         status: "IN",
    //         latitude: lat,
    //         longitude: lng
    //     })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.error) {
    //         statusText.innerText = "Error: " + data.error;
    //     } else {
    //         statusText.innerText = "Berhasil Absen!";
    //     }
    // })
    // .catch(err => {
    //     statusText.innerText = "Gagal terhubung ke server.";
    // })
    // .finally(() => {
    //     btn.disabled = false;
    // });
}