// Live Ridership Tracking System
// Simulates real-time passenger counts and capacity information

class LiveRidershipSystem {
    constructor(stops) {
        this.stops = stops;
        this.liveData = {};
        this.initializeLiveData();
        this.startUpdating();
    }

    initializeLiveData() {
        // Initialize live data for each stop with simulated real-time values
        this.stops.forEach(stop => {
            this.liveData[stop.name] = {
                currentPassengers: this.getBaselinePassengers(stop),
                capacity: 800,
                lastUpdated: new Date(),
                trend: 'stable'
            };
        });
    }

    getBaselinePassengers(stop) {
        // Base passengers on time of day and daily ridership
        const hour = new Date().getHours();
        const dailyRidership = stop.dailyRidership;
        
        // Peak hours: 7-9am, 5-7pm
        if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
            return Math.floor(dailyRidership * 0.6 + Math.random() * dailyRidership * 0.2);
        }
        // Mid-day: 10am-4pm
        else if (hour >= 10 && hour < 17) {
            return Math.floor(dailyRidership * 0.3 + Math.random() * dailyRidership * 0.1);
        }
        // Off-peak: 9pm-7am
        else {
            return Math.floor(dailyRidership * 0.05 + Math.random() * dailyRidership * 0.05);
        }
    }

    getCapacityPercentage(stopName) {
        const data = this.liveData[stopName];
        if (!data) return 0;
        return Math.min(100, (data.currentPassengers / data.capacity) * 100);
    }

    getCapacityStatus(stopName) {
        const percentage = this.getCapacityPercentage(stopName);
        if (percentage < 40) return 'low';
        if (percentage < 75) return 'medium';
        return 'high';
    }

    getCapacityLabel(stopName) {
        const status = this.getCapacityStatus(stopName);
        if (status === 'low') return '✓ Low Capacity';
        if (status === 'medium') return '⚠ Moderate Capacity';
        return '! High Capacity';
    }

    startUpdating() {
        // Update live data every 5-10 seconds
        setInterval(() => {
            this.updateLiveData();
        }, Math.random() * 5000 + 5000);
    }

    updateLiveData() {
        // Simulate passenger flow
        this.stops.forEach(stop => {
            if (this.liveData[stop.name]) {
                const data = this.liveData[stop.name];
                const hour = new Date().getHours();
                
                // Add/remove passengers based on time and random variation
                let change = (Math.random() - 0.5) * stop.dailyRidership * 0.1;
                
                // Increase flow during peak hours
                if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
                    change += (Math.random() * stop.dailyRidership * 0.05);
                }
                
                data.currentPassengers = Math.max(
                    0,
                    Math.min(
                        data.capacity,
                        data.currentPassengers + change
                    )
                );
                
                data.lastUpdated = new Date();
                
                // Determine trend
                if (change > 10) data.trend = 'increasing';
                else if (change < -10) data.trend = 'decreasing';
                else data.trend = 'stable';
            }
        });
        
        // Update UI if callback exists
        if (this.onUpdate) {
            this.onUpdate();
        }
    }

    getLiveData(stopName) {
        return this.liveData[stopName] || null;
    }

    getAllLiveData() {
        return this.liveData;
    }

    getFormattedTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
        });
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LiveRidershipSystem;
}
