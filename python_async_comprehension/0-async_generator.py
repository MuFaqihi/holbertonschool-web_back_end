#!/usr/bin/env python3
"""
Coroutine loops 10 times, waits 1 second each time, and yields a random number from 0 to 10.
"""
import asyncio
import random
from typing import Generator


async def async_generator() -> Generator[float, None, None]:
    """Async Generator using yield"""
    for i in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0, 10)
