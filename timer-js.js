


class CountdownTimer {
    constructor({ selector, targetDate }) {
        const timerDiv = document.querySelector(selector);
        this.refs = {
            spanDays: timerDiv.querySelector('span[data-value="days"]'),
            spanHours: timerDiv.querySelector('span[data-value="hours"]'),
            spanMins: timerDiv.querySelector('span[data-value="mins"]'),
            spanSecs: timerDiv.querySelector('span[data-value="secs"]'),
            dots: timerDiv.querySelectorAll('.value-s')[2],
        }
        this.targetDate = targetDate.getTime();
        this.isActive = false;
    }
    start() {
        if (this.isActive) return;

        this.isActive = true;

        this.id = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this.targetDate - currentTime;
            this.updateClockface(deltaTime);
        }, 100);
    }
    updateClockface(time) {
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        this.refs.spanDays.textContent = `${days}`;

        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.refs.spanHours.textContent = `${hours}`;

        const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        this.refs.spanMins.textContent = `${mins}`;

        const secs = Math.floor((time % (1000 * 60)) / 1000);
        this.refs.spanSecs.textContent = `${secs}`;

        const twinkle = time % 1000;
        if (twinkle < 600) {
            this.refs.dots.style.color = 'rgb(212, 75, 11)';
        } else {
            this.refs.dots.style.color = 'transparent';
        }
    }
}

(new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('October 31, 2021'),
})).start();