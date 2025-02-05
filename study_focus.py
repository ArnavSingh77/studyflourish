# study_focus.py
"""
Module to handle study sessions, sync focus time with study log and analytics,
and allow adding a focus node for each study session.

Each study session can have multiple focus nodes that record the focus time and associated timestamp.

Usage:
    Create a StudySession, add focus nodes as the study progresses, and sync analytics.

The current local time source of truth should be passed to sync functions.
"""

from datetime import datetime
from typing import List


class FocusNode:
    """Represents a focus node for a study session, capturing focus time and timestamp."""
    def __init__(self, timestamp: str, focus_time: int):
        # timestamp should be a string representing the time in ISO format
        self.timestamp = timestamp
        # focus_time in seconds
        self.focus_time = focus_time

    def __repr__(self):
        return f"FocusNode(timestamp={self.timestamp}, focus_time={self.focus_time}s)"


class StudySession:
    """Represents a study session containing focus nodes."""
    def __init__(self, session_id: str, start_time: str):
        # start_time is the session start time as an ISO string
        self.session_id = session_id
        self.start_time = start_time
        self.focus_nodes: List[FocusNode] = []

    def add_focus_node(self, focus_time: int, timestamp: str):
        """
        Add a new focus node to the session and sync with analytics.
        :param focus_time: Focus time in seconds spent during this node period.
        :param timestamp: The ISO formatted timestamp when this focus time was recorded.
        """
        node = FocusNode(timestamp, focus_time)
        self.focus_nodes.append(node)
        self.sync_analytics(node)

    def sync_analytics(self, node: FocusNode):
        """
        Sync focus time of the session with the study log and analytics.
        In a real implementation, this might update a database or send data to an analytics service.
        Here it is simulated with a print statement.
        """
        print(f"[Analytics Sync] Session {self.session_id}: Added {node}")

    def __repr__(self):
        return f"StudySession(session_id={self.session_id}, start_time={self.start_time}, focus_nodes={self.focus_nodes})"


class StudyAnalytics:
    """Maintains and manages multiple study sessions."""
    def __init__(self):
        self.sessions = {}

    def add_session(self, session: StudySession):
        self.sessions[session.session_id] = session
        print(f"[Study Log] Session {session.session_id} started at {session.start_time}")

    def get_session(self, session_id: str) -> StudySession:
        return self.sessions.get(session_id)

    def list_sessions(self):
        return list(self.sessions.values())


# Example usage
if __name__ == '__main__':
    # Assuming the current local time source of truth is provided externally
    current_time = '2025-02-05T16:52:53+05:30'

    # Create a new study session
    session = StudySession(session_id='session_001', start_time=current_time)
    
    analytics = StudyAnalytics()
    analytics.add_session(session)
    
    # Simulate adding focus nodes with focus times (in seconds)
    session.add_focus_node(focus_time=1500, timestamp=current_time)  # e.g. a 25 minutes focus period
    session.add_focus_node(focus_time=1800, timestamp=current_time)  # e.g. a 30 minutes focus period
    
    print("\nCurrent Study Sessions:")
    for s in analytics.list_sessions():
        print(s)
