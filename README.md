function onMessage(msg) {
  var to = msg.getAttribute('to');
  var from = msg.getAttribute('from');
  var type = msg.getAttribute('type');
  var elems = msg.getElementsByTagName('body');

  if (type == "chat" && elems.length > 0) {
    var body = elems[0];
    log('CHAT: I got a message from ' + from + ': ' + Strophe.getText(body));
  }
  // we must return true to keep the handler alive.
  // returning false would remove it after it finishes.
  return true;
}

function sendMessage(msg) {
  log('CHAT: Send a message to ' + $('#to').get(0).value + ': ' + msg);

  var m = $msg({
    to: $('#to').get(0).value,
    from: $('#jid').get(0).value,
    type: 'chat'
  }).c("body").t(msg);
  connection.send(m);
}

function setStatus(s) {
  log('setStatus: ' + s);
  var status = $pres().c('show').t(s);
  connection.send(status);
}

function subscribePresence(jid) {
  log('subscribePresence: ' + jid);
  connection.send($pres({
    to: jid,
    type: "subscribe"
  }));
}

function getPresence(jid) {
  log('getPresence: ' + jid);
  var check = $pres({
    type: 'probe',
    to: jid
  });
  connection.send(check);
}

function getRoster() {
  log('getRoster');
  var iq = $iq({
    type: 'get'
  }).c('query', {
    xmlns: 'jabber:iq:roster'
  });
  connection.sendIQ(iq, rosterCallback);
}

function rosterCallback(iq) {
  log('rosterCallback:');
  $(iq).find('item').each(function() {
    var jid = $(this).attr('jid'); // The jabber_id of your contact
    // You can probably put them in a unordered list and and use their jids as ids.
    log('	>' + jid);
  });
}

function onSubscriptionRequest(stanza) {
  if (stanza.getAttribute("type") == "subscribe") {
    var from = $(stanza).attr('from');
    log('onSubscriptionRequest: from=' + from);
    // Send a 'subscribed' notification back to accept the incoming
    // subscription request
    connection.send($pres({
      to: from,
      type: "subscribed"
    }));
  }
  return true;
}

function onPresence(presence) {
  log('onPresence:');
  var presence_type = $(presence).attr('type'); // unavailable, subscribed, etc...
  var from = $(presence).attr('from'); // the jabber_id of the contact
  if (!presence_type) presence_type = "online";
  log('	>' + from + ' --> ' + presence_type);
  if (presence_type != 'error') {
    if (presence_type === 'unavailable') {
      // Mark contact as offline
    } else {
      var show = $(presence).find("show").text(); // this is what gives away, dnd, etc.
      if (show === 'chat' || show === '') {
        // Mark contact as online
      } else {
        // etc...
      }
    }
  }
  return true;
}