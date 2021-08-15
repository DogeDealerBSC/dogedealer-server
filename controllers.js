const DailyRewards = require("./models/daily.js");

const setValues = async (req) => {
  const { user, sender, amount, Daily, Weekly, Monthly } = req;
  try {
    const data = {
      dailyId: Daily,
      user,
      earnings: amount,
      userReferrers: [sender],
    };

    const oldUser = await DailyRewards.findOne({ user });

    if (oldUser) {
      oldUser.earnings + amount;
      const index = oldUser.userReferrers.findIndex(
        (id) => id === String(sender)
      );

      if (index === -1) {
        oldUser.userReferrers.push(sender);
      }
      const updatedResult = await DailyRewards.findOneAndUpdate(
        { user },
        oldUser,
        { new: true }
      );
      console.log(updatedResult);
      return;
    }

    const newData = await DailyRewards.create(data);
    console.log(newData);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { setValues };
