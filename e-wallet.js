let kasalukuyangBangko = "";
let pera = 0;
let kasalukuyangAksyon = "";

function itagoLahatIpakitaIsa(ipakitaId) {
  const mgaScreen = ['chooseBank', 'loginBox', 'dashboard', 'actionBox'];
  mgaScreen.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === ipakitaId) {
        el.style.setProperty('display', 'block', 'important');
        el.classList.remove('hidden');
      } else {
        el.style.setProperty('display', 'none', 'important');
        el.classList.add('hidden');
      }
    }
  });
}

// Siguraduhing maayos ang clickability ng buttons kapag nag-load ang app
window.addEventListener('DOMContentLoaded', () => {
  itagoLahatIpakitaIsa('chooseBank');
  document.querySelectorAll('.bank-btn, .inner-button').forEach(btn => {
    btn.style.position = 'relative';
    btn.style.zIndex = '9999';
    btn.style.pointerEvents = 'auto';
  });
});

function selectBank(bankName) {
  kasalukuyangBangko = bankName;
  document.getElementById('selectedBank').innerText = bankName;
  itagoLahatIpakitaIsa('loginBox');
}

function goBack(screenId) {
  if(screenId === 'chooseBank') {
    itagoLahatIpakitaIsa('chooseBank');
  }
}

function login() {
  const num = document.getElementById('mobileNumber').value;
  const pass = document.getElementById('password').value;
  if (num.trim() === "" || pass.trim() === "") {
    alert("Mangyaring ilagay ang iyong Mobile Number at Password.");
    return;
  }
  document.getElementById('bankName').innerText = " - " + kasalukuyangBangko;
  itagoLahatIpakitaIsa('dashboard');
}

function showAction(actionType) {
  kasalukuyangAksyon = actionType;
  document.getElementById('amount').value = "";
  const receiverBox = document.getElementById('receiverBox');
  if (actionType === 'deposit') {
    document.getElementById('actionTitle').innerText = "Deposit Money";
    receiverBox.style.setProperty('display', 'none', 'important');
  } else if (actionType === 'withdraw') {
    document.getElementById('actionTitle').innerText = "Withdraw Money";
    receiverBox.style.setProperty('display', 'none', 'important');
  } else if (actionType === 'transfer') {
    document.getElementById('actionTitle').innerText = "Transfer Money";
    receiverBox.style.setProperty('display', 'block', 'important');
    document.getElementById('receiver').value = "";
  }
  itagoLahatIpakitaIsa('actionBox');
  document.getElementById('confirmBtn').onclick = executeAction;
}

function executeAction() {
  const halaga = parseFloat(document.getElementById('amount').value);
  if (isNaN(halaga) || halaga <= 0) {
    alert("Maglagay ng tamang halaga ng pera.");
    return;
  }
  const listahan = document.getElementById('historyList');
  const bagongLog = document.createElement('li');

  if (kasalukuyangAksyon === 'deposit') {
    pera += halaga;
    bagongLog.innerText = `Deposited: ₱${halaga}`;
  } else if (kasalukuyangAksyon === 'withdraw') {
    if (halaga > pera) {
      alert("Paumanhin, hindi sapat ang iyong balance.");
      return;
    }
    pera -= halaga;
    bagongLog.innerText = `Withdrew: ₱${halaga}`;
  } else if (kasalukuyangAksyon === 'transfer') {
    const receiverNum = document.getElementById('receiver').value;
    if (receiverNum.trim() === "") {
      alert("Ilagay ang Mobile Number ng tatanggap.");
      return;
    }
    if (halaga > pera) {
      alert("Paumanhin, hindi sapat ang iyong balance.");
      return;
    }
    pera -= halaga;
    bagongLog.innerText = `Transferred: ₱${halaga} to ${receiverNum}`;
  }

  document.getElementById('balanceDisplay').innerText = `Balance: ₱${pera}`;
  listahan.appendChild(bagongLog);
  const historyContainer = document.querySelector('.history-container');
  if(historyContainer) {
    historyContainer.style.setProperty('display', 'block', 'important');
  }
  backToDashboard();
}

function backToDashboard() {
  itagoLahatIpakitaIsa('dashboard');
}

function logout() {
  document.getElementById('mobileNumber').value = "";
  document.getElementById('password').value = "";
  itagoLahatIpakitaIsa('chooseBank');
}

