// scripts.js
function showLoading(event) {
  event.preventDefault();
  document.getElementById("loading").style.display = "flex";
  setTimeout(function() {
    window.location.href = event.target.href;
  }, 1500);
}

document.addEventListener('DOMContentLoaded', function() {
  const link1 = document.getElementById('link1');
  const link2 = document.getElementById('link2');
  const link3 = document.getElementById('link3');
  link1.addEventListener('click', function(event) {
    showLoading(event);
  });
  link2.addEventListener('click', function(event) {
    showLoading(event);
  });
  link3.addEventListener('click', function(event) {
    showLoading(event);
  });
});

const dotsButtons = document.querySelectorAll('.dots');

dotsButtons.forEach(dotsButton => {
  dotsButton.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const linkButton = dotsButton.parentElement;
    const shareUrl = linkButton.getAttribute('data-share');

    if (!shareUrl) {
      console.error('Atribut data-share tidak ditemukan pada link:', linkButton);
      alert('Error: Tidak dapat menemukan URL untuk dibagikan.');
      return;
    }

    try {
      // Salin link ke clipboard (dilakukan sebelum mencoba share)
      await navigator.clipboard.writeText(shareUrl);
      console.log('Link berhasil disalin ke clipboard:', shareUrl);
      alert('Link berhasil disalin!'); // Anda bisa menghilangkan alert ini jika tidak ingin terlalu banyak notifikasi

      // Coba gunakan Web Share API
      if (navigator.share) {
        await navigator.share({
          title: 'Share', // Anda bisa mengganti judul sesuai keinginan
          url: shareUrl,
        });
        console.log('Berhasil memunculkan dialog berbagi.');
      } else {
        console.log('Web Share API tidak didukung, hanya menyalin ke clipboard.');
        // Alert sudah ditampilkan di atas saat berhasil menyalin
      }
    } catch (err) {
      console.error('Terjadi kesalahan saat berbagi:', err);
      // Jika error karena pengguna membatalkan share (bukan error teknis), abaikan saja
      if (err.name !== 'AbortError') {
        alert('Gagal berbagi.');
      }
    }
  });
});
