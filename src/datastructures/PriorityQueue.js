function PQElement(data, priority) {
  this.data = data;
  this.priority = priority;
}

export default function PriorityQueue() {
  this.items = [];
}

PriorityQueue.prototype.enqueue = function (data, priority) {
  var pqelement = new PQElement(data, priority);
  var contain = false;
  for (var i = 0; i < this.items.length; i++) {
    if (this.items[i].priority > pqelement.priority) {
      this.items.splice(i, 0, pqelement);
      contain = true;
      break;
    }
  }
  if (!contain) {
    this.items.push(pqelement);
  }
};

PriorityQueue.prototype.dequeue = function () {
  if (this.items.length > 0) {
    return this.items.shift().data;
  } else {
    console.log("Underflow");
    return null;
  }
};

PriorityQueue.prototype.front = function () {
  if (this.items.length > 0) {
    return this.items[0].data;
  } else {
    console.log("Empty");
    return null;
  }
};

PriorityQueue.prototype.rear = function () {
  if (this.items.length > 0) {
    return this.items[this.items.length - 1].data;
  } else {
    console.log("Empty");
    return null;
  }
};

PriorityQueue.prototype.isEmpty = function () {
  return this.items.length === 0;
};

PriorityQueue.prototype.contains = function (element) {
  return this.items.includes(element);
};
