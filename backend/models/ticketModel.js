const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  contact: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact' },
  subject: String,
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type' },
  status: { type: mongoose.Schema.Types.ObjectId, ref: 'Status' },
  priority: { type: mongoose.Schema.Types.ObjectId, ref: 'Priority' },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  description: String,
  ticket_number: Number,
  date: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
  activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
});

ticketSchema.statics.createTicket = async function (data) {
  // validation
  const isEmpty = Object.values(data).some((x) => x === null || x === '');

  if (isEmpty) {
    throw Error('All fields must be filled');
  }

  try {
    const ticket_number = await this.countDocuments({});

    const ticket = await this.create({
      contact: data.contact._id,
      subject: data.subject,
      type: data.type._id,
      status: data.status._id,
      priority: data.priority._id,
      group: data.group._id,
      agent: data.agent._id,
      description: data.description,
      date: data.date,
      createdBy: data.createdBy._id,
      ticket_number: ticket_number + 1,
    });

    return ticket;
  } catch (error) {
    throw Error('Error happened when creating ticket');
  }
};

module.exports = mongoose.model('Ticket', ticketSchema);
